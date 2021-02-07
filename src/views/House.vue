<template>
    <v-row>
        <v-col
            cols="12"
        >
            <div class="my-subtitle text-center">
                {{house}}
            </div>
        </v-col>
        <v-col
            cols="12"
        >
            <Character :house="house"></Character>
        </v-col>
    </v-row>
    
</template>
<script>
import Character from '../assets/components/Character2'
export default {
    props: ['house'],
    
    components:{
        Character
    },
    
    
}
</script>