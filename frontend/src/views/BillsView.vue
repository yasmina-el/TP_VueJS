<template>
  <div class="bills">
    <!-- titre et bouton ajouter -->
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des factures</h1>
      </div>
      <div class="col text-end">
        <button @click="$router.push({ name: 'create-bill' })" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter une facture
        </button>
      </div>
    </div>

    <!-- tableau des factures -->
    <TableList v-if="!loading && bills">
      <!-- exemple pour personnaliser les th du tableau TableList : -->
      <!-- <template #thead>
        <th>test</th>
        <th>test</th>
        <th>test</th>
        <th>test</th>
        <th>test</th>
        <th>test</th>
      </template> -->
      <BillTableRow
        v-for="bill in bills"
        :key="bill.id"
        :bill="bill"
        @edit="$router.push({ name: 'edit-bill', params: { id: $event.id } })"
        @delete="deleteBill($event.id)"
      />
    </TableList>

    <div v-else>Loading...</div>

    <AppDebug :datas="bills" />
  </div>
</template>

<script>
import BillTableRow from '@/components/tables/BillTableRow.vue'
import TableList from '@/components/tables/TableList.vue'
import { useBillStore } from '@/stores/bill'
import { mapActions, mapState } from 'pinia'
export default {
  components: {
    TableList,
    BillTableRow
  },
  computed: {
    ...mapState(useBillStore, {
      bills: 'items',
      loading: 'loading'
    })
  },
  async mounted() {
    await this.getBills()
  },
  methods: {
    ...mapActions(useBillStore, {
      deleteBill: 'deleteItem',
      getBills: 'getItems'
    })
  }
}
</script>
