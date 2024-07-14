import { billInterface } from '@/interfaces/bill'
import { defineStore } from 'pinia'

// si je veux interragir avec un autre store, il suffit de l'importer

export const useBillStore = defineStore('bill', {
  state: () => ({
    items: null, //la liste des factures utilisées dans BillsView
    item: null, //formulaire d'édition utilisé dans CreateEditBillView
    loading: false // un simple boolean pour indiquer le chargement des données
  }),
  getters: {},
  actions: {
    // on charge la liste des factures depuis la route d'api GET http://127.0.0.1/bills
    async getItems() {
      this.loading = true
      try {
        const response = await this.$http.get('/bills')
        this.items = response.data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },

    // récupère la facture correspondant à l'id dans le store des bills et enregistre le résultat dans le store de la facture bill
    async setItem(id) {
      // exemple d'intégration d'un autre store dans une fonction :
      // const counterStore = useCounterStore()

      // on peut ensuite faire référence aux fonctions, state, et getters de ce store :
      // counterStore.increment()
      // console.log('counter incrémenté', counterStore.count)

      // ici je fais la différence entre la création d'une nouvelle facture
      // et l'édition d'une facture existante
      if (id === 'new') {
        // si c'est une nouvelle facture, j'utilise un objet tout neuf de mon interface d'objet pour une facture
        this.item = { ...billInterface }
      } else {
        // sinon, j'utilise les données de la facture existante dans la liste des factures
        this.loading = true
        try {
          const response = await this.$http.get('/bills/' + id)
          this.item = response.data
          this.loading = false
        } catch (error) {
          console.error(error)
          this.loading = false
        }
      }
    },

    // mise à jour d'une facture
    async updateItem(form) {
      this.loading = true
      try {
        const response = await this.$http.patch('/bills/' + form.id, form)
        console.log(response.data)
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
    // création d'une nouvelle facture
    async createItem(form) {
      this.loading = true
      try {
        const response = await this.$http.post('/bills', form)
        console.log(response.data)
        // this.item = { ...response.data }
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },

    // suppression d'une facture
    async deleteItem(id) {
      this.loading = true
      try {
        const response = await this.$http.delete('/bills/' + id)
        // ici on raffraichit la liste des factures après modification (delete)
        await this.getItems()
        console.log(response.data)
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    }
  }
})
