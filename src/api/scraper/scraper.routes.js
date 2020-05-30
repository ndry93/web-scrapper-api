const swaggerTags = ['api'];

// routes should not contain logger
module.exports = controller => {
	const routes = [
		{
			method: ['DELETE'],
			path: '/',
			meta: {
				swagger: {
					summary: 'Delete url for web-scrapping',
					description: 'Delete url for web-scrapping',
					swaggerTags
				}
			},
			handler: async (ctx, next) => {
				await controller.deleteURL(ctx);
			}
		},
		{
			method: ['POST'],
			path: '/',
			meta: {
				swagger: {
					summary: 'Register url for web-scrapping',
					description: 'Register url for web-scrapping',
					swaggerTags
				}
			},
			handler: async (ctx, next) => {
				await controller.registerURL(ctx);
			}
		},
		{
			method: ['GET'],
			path: '/render',
			meta: {
				swagger: {
					summary: 'Scrapping test API',
					description: 'Scrapping test API with (e.g. ../render?url=http://gaea.id)',
					swaggerTags
				}
			},
			handler: async (ctx, next) => {
				ctx.type = 'html';
				await controller.testRenderURL(ctx);
			}
		},
		{
			method: ['GET'],
			path: '/:id',
			meta: {
				swagger: {
					summary: 'Get web-scrapping content by ID',
					description: 'Get web-scrapping content by ID',
					swaggerTags
				}
			},
			handler: async (ctx, next) => {
				await controller.getContentByID(ctx);
			}
		}
	];

	return Router => {
		const router = Router();
		router.prefix('/scraper');
		router.route(routes);
		return router;
	};
};
