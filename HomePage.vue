<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hola Mundo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>¡Hola Mundo desde Ionic + Vue! 🎉</h1>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default {
  name: 'Home',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
};
</script>

<style>
h1 {
  text-align: center;
  color: #3880ff;
}
</style>
