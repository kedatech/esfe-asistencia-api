export function ResponseProvider<T = null>(status: number, message: string, data:T){
  return ({
    code:status,
    message,
    data
  })
  
}