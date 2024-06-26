import { z } from "zod"
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";


export const getAttendeesBadge = async (app: FastifyInstance)=>{
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendee/:attendeeId/badge",
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {},
      },
    },
    async (req, res) => {
      const { attendeeId } = req.params;

			const attendee = await prisma.attendee.findUnique({
				select: {
					name: true,
					email: true,
					event: {
						select: {
							title: true
						}
					}
				},
				where: {
					id: attendeeId
				}
			})

			if(attendee == null){
				throw new Error('Attendee not found.');
			}

			return res.send({ attendee })
    }
  );
}