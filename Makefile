.DEFAULT_GOAL := help
.PHONY: help

help: ## 🛟  Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-7s\033[0m %s\n", $$1, $$2}'

be_docker: ## 🎒 Launch Backend
	@echo "🎒 Launching Backend" 
	cd backend && docker compose up -d

fe: ## 🌐 Launch Frontend
	@echo "🌐 Launching Frontend" 
	cd frontend && npm install && npm run dev

admin: ## 👷 Launch Admin
	@echo "👷 Launching Admin" 
	cd backend/admin && npm install && npm run dev

up_admin: be_docker admin ## 🧪 Launch Backend + Admin  (recommended)

up_fe: be_docker fe ## 💔 Launch Backend + Frontend

up: ## 🌕 Launch Full Stack - Local (recommended)
	@echo "🌕 Launching Full Stack - Local"
	be_docker admin fe

down: ## 🛑 Stop Backend
	@echo "🛑 Stopping Backend" 
	cd backend && docker compose down

prune: ## 🧹 Clear Docker
	@echo "🧹 Clear Docker"
	docker system prune -a
