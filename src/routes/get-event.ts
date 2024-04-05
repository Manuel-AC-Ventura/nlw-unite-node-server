import { z } from "zod"
import { prisma } from "../lib/prisma";
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';


export const getEvent = async (app: FastifyInstance)=>{
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/events/:eventId",
    {
      schema: {
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {

        }
      }
    },
    async (req, res)=>{
      const { eventId } = req.params

      const event = await prisma.event.findUnique({
        where: {
          id: eventId
        }
      })

      if(event == null){
        throw new Error('Event not found')
      }

      return res.send({ event })
    })
}