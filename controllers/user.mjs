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

export default function initUsersController(db) {
  // check if user email in db
  const search = async (request, response) => {
    const { email } = request.body;
    try {
      const ifUserExists = await db.User.findOne({
        where: {
          email,
        },
      });
      // if exists send back user data else send back false
      if (ifUserExists != null) {
        response.send(ifUserExists);
      } else {
        response.send(false);
      }
    } catch (error) {
      console.error('!Error in finding user', error);
    }
  };

  // create new user
  const create = async (request, response) => {
    const { displayName, email } = request.body;
    console.log(displayName, email);
    try {
      const newUser = await db.User.create(
        {
          displayName,
          email,
        },
      );
      console.log('newUser Created!');
      console.log(newUser);
      response.send(newUser);
    } catch (error) {
      console.error('!Error in creating new user', error);
    }
  };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    search,
    create,
  };
}
