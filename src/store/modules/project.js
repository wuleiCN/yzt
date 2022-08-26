const state = {
  contarct: {
    width: '100%',
    height: '330'
  }
}

const mutations = {
  SET_CONTRACT: (state, data) => {
    state.contarct = data
  }
}

const actions = {
  contarct({ commit, state }, data) {
    commit('SET_CONTRACT', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
