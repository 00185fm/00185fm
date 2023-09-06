MAKEFLAGS += -j2

bg:
	@echo "🚀 Launching the Backend" 
	cd backend && docker-compose up -d
fg_pub:
	@echo "🚀 Launching the Frontend Public" 
	cd frontend_public && pnpm i && pnpm dev

fg_priv:
	@echo "🚀 Launching the Frontend Private" 
	cd backend/app && npm install && npm run dev

up_priv: bg fg_priv

up_pub: bg fg_pub

up: bg fg_priv fg_pub ## 💄 Run all the components quickly

down:
	@echo "🛑 Stopping the Backend" 
	cd backend && docker-compose down