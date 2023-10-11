import api from '../apiAxios'

export const addWater = (water) =>{
   return api
    .post('/users/me/water',{
      consumed_water: water,
      created_at: new Date()
    })
    // then é a mesma coisa coisa que await, entao, ele vai bater na rota, vai esperar gravar o dado no
    //banco e entao vai fazer alguma coisa, retornar por exemplo
    .then(({data})=>{
      
      // console.log(data)
      return data

    })
    .catch((e)=>{
      console.error(e)
      alert('Falha ao adicionar água')
    })

}

export const getWater = ()=>{
  return api
  .get('/users/me/water')
  .then(({data}) =>{
    return data
  }).catch((e)=>{
    console.error()
    alert('Falha ao buscar água')
  })
}

export const createMeal = (meal) => {
  return api
    .post('/users/me/meal', {
      name: meal
    })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
      alert('falha ao criar refeição')
    })
}

export const createProgress = (data) => {
  const { height, weight, activity_level, goal } = data
  return api
    .post('/users/me/progress', {
      height,
      weight,
      activity_level,
      goal
    })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
      alert('falha ao criar progresso')
    })
}
export const getProgress = () => {
  return api
    .get('/users/me/progress')
    .then(({ data }) => {
      return data
    }).catch(() => {
      alert("falha ao requisitar Diary ")
    })
}
export const createDiary = () => {
  return api
    .post("/users/me/diary")
    .then((data) => {
      return data
    }).catch((e) => {
      alert('erro a criar Diary')
    })
}
export const editDiary = (data) => {
  const { consumed_water, remaning_daily_goal_kcal } = data
  return api
    .put('/users/me/diary', {
      consumed_water,
      remaning_daily_goal_kcal
    }).then(({ data }) => {
      return data
    }).catch((e) => {
      alert("falha ao editar Diary")
    })
}
export const getDiary = () => {
  return api
    .get('/users/me/diary')
    .then(({ data }) => {
      return data
    }).catch(() => {
      alert("falha ao requisitar Diary ")
    })
}
export const getUser = () => {
  return api
    .get('/users/me')
    .then(({ data }) => {
      return data
    }).catch(() => {
      alert("falha ao requisitar Diary ")
    })
}
