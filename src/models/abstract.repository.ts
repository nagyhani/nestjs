import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose"

export abstract class AbstractRepository<T>{

    constructor(private _model : Model<T>){}


    public async create(item: Partial <T>){
      const doc = new this._model(item)

      return doc.save()
    }

    public async getOne(filter:QueryFilter<T>, projection?: ProjectionType<T>,options?:QueryOptions<T>){

      return  this._model.findOne(filter,projection,options)
    }


    public async getAll(filter:QueryFilter<T>, projection?: ProjectionType<T>,options?:QueryOptions<T>){

      return  this._model.find(filter,projection,options)
    }

     public async update(filter:QueryFilter<T>,update:UpdateQuery<T>,options:QueryOptions<T> = {}){

        options.returnDocument = "after"
      return  this._model.findOneAndUpdate(filter,update,options)
    }

    public async delete(filter:QueryFilter<T>){
       return await this._model.deleteOne(filter)
    }
}