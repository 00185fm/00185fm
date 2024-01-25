MAKEFLAGS += -j2

be_docker:
	@echo "🚀 Launching the Backend" 
	cd backend && docker compose up -d
fe:
	@echo "🚀 Launching the Frontend" 
	cd frontend && npm install && npm run dev

admin:
	@echo "🚀 Launching the Admin" 
	cd backend/admin && npm install && npm run dev

up_admin: 
	be_docker admin

up_fe:
	be_docker fe

up: 
	@echo "🚀 Launching 00185fm - Local"
	be_docker admin fe

down:
	@echo "🛑 Stopping the Backend" 
	cd backend && docker compose down

prune:
	@echo "🧹 Clear Docker"
	docker system prune -a
