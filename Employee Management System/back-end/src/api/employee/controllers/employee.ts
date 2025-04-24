/**
 * employee controller
 */

// import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::employee.employee');



import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::employee.employee', ({ strapi }) => ({
  async myProfile(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in");
    }

    const employee = await strapi.db.query('api::employee.employee').findOne({
      where: { user: user.id },
      populate: ['department', 'profilePicture'], // Add any related fields
    });

    if (!employee) {
      return ctx.notFound("Employee profile not found");
    }

    return { data: employee };
  }
}));
