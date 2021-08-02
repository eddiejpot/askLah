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
  // find session details by sessionId
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

  // find all sessions that below to user
  const index = async (request, response) => {
    const { userId } = request.query;
    try {
      const allSessions = await db.Session.findAll({
        where: {
          userId,
        },
      });
      // send back all sessions
      response.send(allSessions);
    } catch (error) {
      console.error('!Error getting session', error);
    }
  };

  // create new session
  const create = async (request, response) => {
    const {
      userId, title, speaker, description, date, sessionId,
    } = request.body;
    try {
      const newSession = await db.Session.create(
        {
          userId,
          title,
          speaker,
          description,
          date,
          sessionId,
        },
      );
      response.send(newSession);
    } catch (error) {
      console.error('!Error in creating new session', error);
    }
  };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    search,
    index,
    create,
  };
}
