<template>
  <div class="clients">
    <!-- titre et bouton ajouter -->
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des clients</h1>
      </div>
      <div class="col text-end">
        <button @click="$router.push({ name: 'create-client' })" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter un client
        </button>
      </div>
    </div>

    <!-- tableau des factures -->
    <TableListClient v-if="!loading && clients">
      <!-- exemple pour personnaliser les th du tableau TableList : -->
      <!-- <template #thead>
        <th>test</th>
        <th>test</th>
        <th>test</th>
        <th>test</th>
        <th>test</th>
        <th>test</th>
      </template> -->
      <ClientTableRow
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @edit="$router.push({ name: 'edit-client', params: { id: $event.id } })"
        @delete="deleteClient($event.id)"
      />
    </TableListClient>

    <div v-else>Loading...</div>

    <AppDebug :datas="clients" />
  </div>
</template>

<script>
import ClientTableRow from '@/components/tables/ClientTableRow.vue'
import TableListClient from '@/components/tables/TableListClient.vue'
import { useClientStore } from '@/stores/client'
import { mapActions, mapState } from 'pinia'
export default {
  components: {
    TableListClient,
    ClientTableRow
  },
  computed: {
    ...mapState(useClientStore, {
      clients: 'items',
      loading: 'loading'
    })
  },
  async mounted() {
    await this.getClients()
  },
  methods: {
    ...mapActions(useClientStore, {
      deleteClient: 'deleteItem',
      getClients: 'getItems'
    })
  }
}
</script>
