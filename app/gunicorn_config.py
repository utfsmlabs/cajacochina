import multiprocessing

bind = '0.0.0.0:1337'
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'gevent'
reload = True
