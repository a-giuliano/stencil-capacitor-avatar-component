import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  tag: 'my-avatar',
  styleUrl: 'my-avatar.css',
  shadow: true,
})
export class MyAvatar {
  @Prop({ mutable: true }) image: string = 'https://avatars.dicebear.com/api/micah/capacitor.svg';

  @Event() myChange: EventEmitter<String>;

  handleClick = async () => {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    this.image = photo.webPath;
    this.myChange.emit(this.image);
  };

  render() {
    return (
      <Host>
        <img src={this.image} alt="avatar" onClick={this.handleClick} />
      </Host>
    );
  }
}
