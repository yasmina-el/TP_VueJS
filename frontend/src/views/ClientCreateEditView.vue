<template>
  <div>
    <div class="client" v-if="!loading && client">
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2" />Créer un client
          </h1>
          <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Modifier les informations clients</h1>
        </div>
        <div v-if="!isNewClient" class="col text-end">
          <button @click="onDeleteClient(client)" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash me-2" />
            Supprimer le client
          </button>
        </div>
      </div>

      <div class="alert alert-danger my-3" v-if="error">Un champ requière votre attention</div>

      <h5 class="row ms-2">Contact: </h5>

      <div class="row">
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              v-model="client.firstName"
              class="form-control"

              :class="{ 'is-invalid': !client.firstName }"
            />
            <label for="firstName" class="form-label">Prénom</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="form-control"
              v-model="client.lastName"
              :class="{ 'is-invalid': !client.lastName }"
            />
            <label for="lastName" class="form-label">Nom</label>
          </div>

        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="date"
              name="date"
              id="date"
              class="form-control"
              placeholder="Date"
              format="yyyy-MM-dd"
              v-model="client.date"
              :class="{ 'is-invalid': !client.date }"
            />
            <label for="date" class="form-label">Ajouter le</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-floating mb-3">
            <input
              type="text"
              name="email"
              id="email"
              v-model="client.email"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.email }"
            />
            <label for="email" class="form-label">Email</label>
          </div>
      </div>

      <div class="row">
        <div class="form-floating mb-3">
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              v-model="client.phoneNumber"
              class="form-control"
              :class="{ 'is-invalid': !client.phoneNumber }"
            />
            <label for="phoneNumber" class="form-label">Téléphone</label>
          </div>
      </div>

      <div class="row">
        <div class="form-floating mb-3">
            <input
              type="text"
              name="companyName"
              id="companyName"
              v-model="client.companyName"
              class="form-control"
              :class="{ 'is-invalid': !client.companyName }"
            />
            <label for="companyName" class="form-label">Entreprise</label>
          </div>
      </div>
      <div class="row">
        <div class="form-floating mb-3">
            <input
              type="text"
              name="fonction"
              id="fonction"
              v-model="client.fonction"
              class="form-control"
              :class="{ 'is-invalid': !client.fonction }"
            />
            <label for="companyName" class="form-label">Fonction occupée</label>
          </div>
      </div>
      <h5 class="row ms-2 mt-3">Coordonnes: </h5>
      <div class="row">
        <div class="form-floating mb-3">
            <input
              type="text"
              name="adress1"
              id="adress1"
              v-model="client.adress1"
              class="form-control"
              :class="{ 'is-invalid': !client.adress1 }"
            />
            <label for="adress1" class="form-label">Adresse 1</label>
          </div>
      </div>
      <div class="row">
        <div class="form-floating mb-3">
            <input
              type="text"
              name="adress2"
              id="adress2"
              v-model="client.adress2"
              class="form-control"
              :class="{ 'is-invalid': !client.adress2 }"
            />
            <label for="adress2" class="form-label">Adresse 2</label>
          </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="codePostal"
              id="codePostal"
              v-model="client.codePostal"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.codePostal }"
            />
            <label for="codePostal" class="form-label">Code postal</label>
          </div>
          

          <div class="form-floating mb-3">
            <select
              name="country"
              id="country"
              class="form-control"
              v-model="client.country"
              :class="{ 'is-invalid': !client.country }"
            >
              <option value="">Veuillez sélectionner un pays </option>
              <option v-for="country in countries" :value="country" >
                {{ country }}
              </option>
            </select>
            <label for="client" class="form-label">Pays</label>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="city"
              id="city"
              class="form-control"
              v-model="client.city"
              :class="{ 'is-invalid': !client.city }"
            />
            <label for="description" class="form-label">Ville</label>
          </div>

        </div>

      </div>

      <p class="text-end">
        <button
          @click="onSave()"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2" />Enregistrer
        </button>
      </p>

      <AppDebug :datas="client" />
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>

import { countries } from '@/seeds/countries.js'
import { useClientStore } from '@/stores/client'
import { mapActions, mapState, mapWritableState } from 'pinia'
export default {

  props: {
    id: {
      type: String,
      default: 'new'
    }
  },
  data() {
    return {
      countries,
      error: false
    }
  },
  mounted() {
    this.setClient(this.id)
  },
  computed: {
    ...mapState(useClientStore, {
      loading: 'loading'
    }),
    
    ...mapWritableState(useClientStore, {
      client: 'item'
    }),

    isNewClient() {
      return this.id === 'new'
    },

    formInvalid() {
      
      return (
        !this.client ||
        !this.client.firstName ||
        !this.client.lastName ||
        !this.client.fonction ||
        !this.client.phoneNumber ||
        !this.client.date ||
        !this.client.email ||
        !this.client.adress1 ||
        !this.client.adress2 ||
        !this.client.codePostal ||
        !this.client.city ||
        !this.client.country 

      )
    },
  
  },

  methods: {
    ...mapActions(useClientStore, {
      setClient: 'setItem',
      updateClient: 'updateItem',
      createClient: 'createItem',
      deleteClient: 'deleteItem'
    }),

    onDeleteClient() {
      this.deleteClient(this.id)
      this.$router.push({ name: 'clients' })
    },
    onSave() {
      // si j'ai une erreur dans le formulaire
      if (this.formInvalid) {
        // gestion des erreurs ici
        this.error = true
      } else {
        this.error = false
        // on appelle la méthode de sauvegarde de la donnée du store
        if (this.isNewClient) {
          console.log('create', this.client)
          this.createClient(this.client)
        } else {
          console.log('update', this.client)
          this.updateClient(this.client)
        }
        // on revient sur la page précédente
        this.$router.push({ name: 'clients' })
      }
    }
  },

}
</script>
