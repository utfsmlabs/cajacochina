import multiprocessing

bind = 'unix:/cajacochina/oink.sock'
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'gevent'
reload = True
