/* ----------------------------------------- */
/* -------------------------- IMPORT MODULES */
/* ----------------------------------------- */
import pkg from 'sequelize';
import { resolve } from 'path';

const { Op } = pkg;

/*
 * ========================================================
 *                  Controller Functions
 * ========================================================
 */

export default function initSessionsController(db) {
  // check if user email in db
  const search = async (request, response) => {
    const { sessionId } = request.query;
    try {
      const sessionDetails = await db.Session.findOne({
        where: {
          sessionId,
        },
      });
      // send back session deatils
      response.send(sessionDetails);
    } catch (error) {
      console.error('!Error getting session', error);
    }
  };

  // // create new user
  // const create = async (request, response) => {
  //   const { displayName, email } = request.body;
  //   console.log(displayName, email);
  //   try {
  //     const newUser = await db.User.create(
  //       {
  //         displayName,
  //         email,
  //       },
  //     );
  //     console.log('newUser Created!');
  //     console.log(newUser);
  //     response.send(newUser);
  //   } catch (error) {
  //     console.error('!Error in creating new user', error);
  //   }
  // };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    search,
  };
}
