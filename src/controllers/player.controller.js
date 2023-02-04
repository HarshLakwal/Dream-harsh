//const playerServices = require('../services/playerServices')
//const userService = require('../services/user.service')

module.exports = (fastify) => {
    const UserService = require('../services/playerServices')(fastify)
    const dao=require("../dao/otpModel.dao")
    const {
      httpResponseHandler,
      httpResponseHandlerWithPagination
    } = require('../utils/response.handler')
    return {
      create: async (request, reply) => {
        const { body } = request 
        let result
        try {
          result = await UserService.create(body)
        } catch (exception) {
          const { message, statusCode } = exception
          // if required can be logged here
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred: ${message}`)
        }
        return reply.send(httpResponseHandler(result))
      },
  
      get: async (request, reply) => {
        const { query } = request
        let result
        try {
          result = await UserService.get(query)
        } catch (exception) {
          const { message, statusCode } = exception
          // if required can be logged here
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred: ${message}`)
        }
        return reply.send(httpResponseHandlerWithPagination(result))
      },
  
      getById: async (request, reply) => {
        const { id } = request.params
        let result
        try {
          result = await UserService.getById(id)
        } catch (exception) {
          const { message, statusCode } = exception
          // if required can be logged here
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred: ${message}`)
        }
        return reply.send(httpResponseHandler(result))
      },
  
      getByEmail: async (request, response) => {
        const {
          params: { email }
        } = request
        let user
        try {
          user = await UserService.getByEmail(email)
        } catch (exception) {
          const { message, statusCode } = exception
          // if required can be logged here
          return response
            .status(statusCode)
            .send(`An unxpected error occurred: ${message}`)
        }
        return response.status(200).send(httpResponseHandler(user))
      },
  
      update: async (request, reply) => {
        const { body, params } = request
        let result
        try {
          result = await UserService.update({ ...body, ...params })
        } catch (exception) {
          const { message, statusCode } = exception
          // if required can be logged here
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred: ${message}`)
        }
        return reply.send(httpResponseHandler(result))
      },
  
      delete: async (request, reply) => {
        const { id } = request.params
        let result
        try {
          result = await UserService.delete(id)
        } catch (exception) {
          const { message, statusCode } = exception
          // if required can be logged here
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred: ${message}`)
        }
        return reply.send(httpResponseHandler(result || { deleted: id }))
      },
      verify:async(req,res)=>{
        const mobile=req.body.mobile;
        const otp=req.body.otp;
        try{
            const result=await UserService.playerlogin(req.body);
            if(result){
                const res=await dao.FindOtp(mobile);
                if(res==otp){
                    res.status(201).send("otp is verified");
                }else{
                    res.status(404).send("invalid data entry")
                }
            }           
        }catch(error){
            res.send("playerservice file..data not found",error);
        }
      }
    }
  }
  