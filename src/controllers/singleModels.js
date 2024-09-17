export const GetAllData = async(model_name) => {
    let data_list = await model_name.find({})

    return data_list 
}

export const GetSingleData = async(model_name, id) => {
    let data = await model_name.findById(id)

    return data
}

export const CreateData = async(model_name, data) => {
    const new_customer = new model_name(data)
    await new_customer.save()

    return "Data Saved"
}

export const UpdateData = async(model_name, id, data) => {
    await model_name.findByIdAndUpdate(id, data)
    
    return "Data Updated"
}

export const DeleteData = async(model_name, id) => {
    await model_name.findByIdAndDelete(id)
    
    return GetAllData(model_name)
}