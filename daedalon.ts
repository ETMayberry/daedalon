class Daedalon {
  constructor() {
    console.log('Daedalon constructed.');
  }
  
  testfunc() {
    console.log('testfunc invoked.');
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    console.log(document);
    var container = document.getElementById( 'container' );
    container.appendChild( this.renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial({color:0xffffff});
    var cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

    this.camera.position.z = 6;
    var light = new THREE.PointLight(0xffffff);
	  light.position.set(1,2,2);
	  this.scene.add(light);
	  
    var ambientLight = new THREE.AmbientLight(0x111111);
    this.scene.add(ambientLight);
    
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    this.scene.add(skyBox);
    
    //controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    
    var animate = function () {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				this.renderer.render( this.scene, this.camera );
			}.bind(this);

			animate().bind(this);
  }
  
  get scene() {
    return this._scene || (this._scene = new THREE.Scene());
  }
  
  get camera() {
    return this._camera || (this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ));
  }
  
  get renderer() {    
    return this._renderer || (this._renderer = new THREE.WebGLRenderer());
  }
  
}

var asdf = new Daedalon();
asdf.testfunc();