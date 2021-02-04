<template>
    <v-data-iterator
    :items="characters"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
            <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
        </v-toolbar>
        <v-row>
            <v-col
                v-for="item in characters"
                :key="item.name"
                cols="12"
                sm="6"
                md="6"
                lg="4"
            >
                <v-card>
                    <v-card-title class="subheading font-weight-bold">
                        {{ item.name }}
                    </v-card-title>
                    <v-img
                        contain
                        height="150"
                        :src="item.image"
                    ></v-img>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-item
                            v-for="(key, index) in filteredKeys"
                            :key="index"
                        >
                            <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                            {{ key }}:
                            </v-list-item-content>
                            <v-list-item-content
                                class="align-end"
                                :class="{ 'blue--text': sortBy === key }"
                            >
                                {{ key==='LastName' ? getLastname(item['name']) :  item[key.toLowerCase()] }}
                            </v-list-item-content>
                        </v-list-item>
                        
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
                <v-btn
                    dark
                    text
                    color="primary"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                >
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-list>
                    <v-list-item
                        v-for="(number, index) in itemsPerPageArray"
                        :key="index"
                        @click="updateItemsPerPage(number)"
                    >
                        <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-row>
    </v-data-iterator>
</template>
<script>
export default {
    props:{
        characters: Array
    },
    data: function(){
        return {
            itemsPerPageArray: [4, 8, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 4,
            sortBy: 'name',
            keys: [
                'Name',
                'LastName',
                'species',
                'gender',
                'dateOfBirth',
                'ancestry',
                'eyeColour',
                'hairColour',
            ],
        }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
          console.log("entra")
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods:{
        getLastname: function(name){
            //var arrayname = name.split(' ')
            //console.log("entra")
            return name.split(" ")[1]
        },
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage (number) {
            this.itemsPerPage = number
        },
    }
}
</script>