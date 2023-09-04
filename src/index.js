import Movements from "./Movements.js";
import polygon from "./web3.js";
import abi from "./abi.json" assert {type:"json"};
// 0xD5B7eF11E9E5602d99fBB25db33A15Fb3c11b81F
const scene = new THREE.Scene();
scene.background = new THREE.Color(800080)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry_area = new THREE.BoxGeometry(100,0.2,50 );
const material_area = new THREE.MeshBasicMaterial( { color: 0xffffff} );
const area = new THREE.Mesh( geometry_area,  material_area );
scene.add( area );

// const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
// const material_cylinder = new THREE.MeshPhongMaterial( {color: 0xffff00} ); 
// const cylinder = new THREE.Mesh(  geometry_cylinder, material_cylinder ); 
// scene.add( cylinder );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// cylinder.position.set(20,5,0);

camera.position.z = 5;
camera.position.set(10,5,40);



function animate() {
    // cube.rotation.x += 0.05;
    // cube.rotation.y += 0.05;
    // cube.rotation.z += 0.05;
    // // camera.position.x -= 0.01;
    // cylinder.rotation.x += 0.05;
    requestAnimationFrame( animate );

    if(Movements.isPressed(37)){//left
        camera.position.x-=0.5;
    }
    if(Movements.isPressed(38)){//up
        camera.position.x+=0.5;
        camera.position.y+=0.5;
    }
    if(Movements.isPressed(39)){//right
        camera.position.x+=0.5;
    }
    if(Movements.isPressed(40)){//down
        camera.position.x-=0.5;
        camera.position.y-=0.5;
    }
     camera.lookAt(area.position);
	renderer.render( scene, camera );
}


animate();

renderer.render(scene,camera);

const button = document.querySelector("#mint");
button.addEventListener("click", mintNFT);

async function mintNFT() {
  let nft_name = document.querySelector("#nft_name").value;
  let nft_width = document.querySelector("#nft_width").value;
  let nft_height = document.querySelector("#nft_height").value;
  let nft_depth = document.querySelector("#nft_depth").value;
  let nft_x = document.querySelector("#nft_x").value;
  let nft_y = document.querySelector("#nft_y").value;
  let nft_z = document.querySelector("#nft_z").value;

  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x290E9f4f24Bd4F6197F338C715Eef043795cE5F4"
  );

  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
      .send({
        from: accounts[0],
        value: "10",
      })
      .then((data) => {
        console.log("NFT is minted");
      });
  });
}


polygon.then((result)=>{
    result.nft.forEach((object,index)=>{
        if(index<= result.supply){
            const myBigIntw = BigInt(object.w);
            const myBigInth = BigInt(object.h);
            const myBigIntd = BigInt(object.d);
            const myNumberw = Number(myBigIntw);
            const myNumberh = Number(myBigInth);
            const myNumberd = Number(myBigIntd);
            
             const geometry_cube = new THREE.BoxGeometry(myNumberw,myNumberh,myNumberd);
         const material_cube = new THREE.MeshPhongMaterial({ color: 0x1be3ef });
            const nft = new THREE.Mesh(geometry_cube ,material_cube);
            const x = BigInt(object.x);
            const y = BigInt(object.y);
            const z = BigInt(object.z);

            const nux = Number(x);
            const nuy = Number(y);
            const nuz = Number(z);
            console.log(nux);
            console.log(nuy);
            console.log(nuz);
            nft.position.set(nux,nuy,nuz);
            scene.add(nft);
        }
    })
})



