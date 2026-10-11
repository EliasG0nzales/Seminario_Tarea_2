import os, re, sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
class H(SimpleHTTPRequestHandler):
    def send_head(self):
        rng = self.headers.get('Range')
        path = self.translate_path(self.path)
        if not rng or not os.path.isfile(path):
            return super().send_head()
        m = re.match(r'bytes=(\d*)-(\d*)', rng)
        size = os.path.getsize(path)
        if not m:
            return super().send_head()
        start = int(m.group(1)) if m.group(1) else max(0, size - int(m.group(2)))
        end = int(m.group(2)) if (m.group(1) and m.group(2)) else size - 1
        end = min(end, size - 1)
        if start > end:
            self.send_error(416); return None
        f = open(path, 'rb'); f.seek(start)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        self._remaining = end - start + 1
        return f
    def copyfile(self, src, dst):
        rem = getattr(self, '_remaining', None)
        if rem is None:
            return super().copyfile(src, dst)
        while rem > 0:
            chunk = src.read(min(65536, rem))
            if not chunk: break
            dst.write(chunk); rem -= len(chunk)
        self._remaining = None
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()
if __name__ == '__main__':
    os.chdir(sys.argv[1])
    ThreadingHTTPServer(('0.0.0.0', int(sys.argv[2])), H).serve_forever()
