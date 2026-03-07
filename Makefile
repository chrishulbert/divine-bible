help:
	cat Makefile

serve:
	go run serve.go
	
servePython:
	python3 -m http.server 8000
