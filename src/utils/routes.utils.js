
const addOperation = {
	read: (router, route, controller) => router.get(`/${route}`, controller.all),
	create: (router, route, controller) => router.post(`/${route}`, controller.save),
	show: (router, route, controller) => router.get(`/${route}/:id`, controller.find),
	update: (router, route, controller) => router.post(`/${route}/:id`, controller.save),
	delete: (router, route, controller) => router.delete(`/${route}/:id`, controller.destroy),
}

const addOperationRoutes = (router, controller, { route, operations }) => {
	operations.forEach(operation => {
		addOperation[operation](router, route, controller)
	});
}

module.exports = { addOperationRoutes }