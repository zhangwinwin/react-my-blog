import Joi from 'joi'

const createComment = Joi.object().keys({
  userId: Joi.number().required(),
  articleId: Joi.number().required(),
  content: Joi.string()
})

const createReply = Joi.object().keys({
  userId: Joi.number().required(),
  articleId: Joi.number().required(),
  commentId: Joi.number().required(),
  content: Joi.string()
})

export default {
  createComment,
  createReply
}