
export class FirebaseUser {
  constructor(
    public email: string,
    public displayName: string,
    public pictureUrl: string,
    public uid: string
  ) { }

  // get uid() {
  //   return this._uid;
  // }
}
