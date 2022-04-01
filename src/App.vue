<template>
  <v-app>
   
   
    <v-app-bar >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>INVESTMENT CALCULAROR</v-toolbar-title>
    </v-app-bar>
     <v-navigation-drawer
    v-model="drawer"
    >
       <v-list
          nav
          dense
          mini-variant-width
        >
          <v-list-item link
          to="/"
         >
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>SIP</v-list-item-title>
          </v-list-item>
          <v-list-item 
          to="/lumpsum"
          
          link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>LUPSUM</v-list-item-title>
          </v-list-item>
          <v-list-item 
          to="/stepupsip"
          link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>STEP UP SIP</v-list-item-title>
          </v-list-item>
          <v-list-item 
          to="/inflation"
          link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>INFLATION</v-list-item-title>
          </v-list-item>
          <v-list-item 
          to="/deflation"
          link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>DEFLATION</v-list-item-title>
          </v-list-item>
           <v-list-item 
          to="/cagr"
          link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>CAGR</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-main>
  <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'app',

  data: () => ({
     drawer: null, 
     
  }),
};
</script>
