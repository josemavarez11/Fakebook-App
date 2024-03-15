import { AlertController } from '@ionic/angular';

const alertCtrl = new AlertController();

export const alert = async (header: string, subHeader: string, buttons: string[]) => {
  const alert = await alertCtrl.create({
    header,
    subHeader,
    buttons
  });
  await alert.present();
  await alert.onDidDismiss();
  return
}
