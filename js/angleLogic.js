let camPos = {
    x: 0,
    y: 0,
    z: 0
}

let camRot = {
    x: 0,
    y: 0,
    z: 0
}

let position = {
    x: 0,
    y: 0,
    z: 0
}

let relativePosition = {
    x: 0,
    y: 0,
    z: 0
}

let angles = {
    x: 0,
    y: 0,
    z: 0
}

let angleToMiddle = {
    x: 0,
    y: 0,
    z: 0
}

function limiteAngle(angle) {
    while (angle < 0 - 0.0001) {
        angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI + 0.0001) {
        angle -= 2 * Math.PI;
    }
    return angle;
}

function updateAngle(){
    angles.x = limiteAngle(angles.x);
    angles.y = limiteAngle(angles.y);
    angles.z = limiteAngle(angles.z);
    angleToMiddle.x = limiteAngle(angleToMiddle.x);
    angleToMiddle.y = limiteAngle(angleToMiddle.y);
    angleToMiddle.z = limiteAngle(angleToMiddle.z);
    camRot.x = limiteAngle(camRot.x);
    camRot.y = limiteAngle(camRot.y);
    camRot.z = limiteAngle(camRot.z);
}

function updateRelativePosition(){
    relativePosition.x = (position.x > camPos.x) ? position.x - camPos.x : camPos.x - position.x;
    relativePosition.y = (position.y > camPos.y) ? position.y - camPos.y : camPos.y - position.y;
    relativePosition.z = (position.z > camPos.z) ? position.z - camPos.z : camPos.z - position.z;
}

function updateAngleToMiddle(){
    angleToMiddle.x = Math.atan(relativePosition.x / relativePosition.z);
    angleToMiddle.y = Math.atan(relativePosition.y / relativePosition.z);
    angleToMiddle.z = Math.atan(relativePosition.z / relativePosition.x);
}

function noNaN(){
    camPos.x = (isNaN(camPos.x)) ? 0 : camPos.x;
    camPos.y = (isNaN(camPos.y)) ? 0 : camPos.y;
    camPos.z = (isNaN(camPos.z)) ? 0 : camPos.z;
    camRot.x = (isNaN(camRot.x)) ? 0 : camRot.x;
    camRot.y = (isNaN(camRot.y)) ? 0 : camRot.y;
    camRot.z = (isNaN(camRot.z)) ? 0 : camRot.z;
    position.x = (isNaN(position.x)) ? 0 : position.x;
    position.y = (isNaN(position.y)) ? 0 : position.y;
    position.z = (isNaN(position.z)) ? 0 : position.z;
    relativePosition.x = (isNaN(relativePosition.x)) ? 0 : relativePosition.x;
    relativePosition.y = (isNaN(relativePosition.y)) ? 0 : relativePosition.y;
    relativePosition.z = (isNaN(relativePosition.z)) ? 0 : relativePosition.z;
    angles.x = (isNaN(angles.x)) ? 0 : angles.x;
    angles.y = (isNaN(angles.y)) ? 0 : angles.y;
    angles.z = (isNaN(angles.z)) ? 0 : angles.z;
    angleToMiddle.x = (isNaN(angleToMiddle.x)) ? 0 : angleToMiddle.x;
    angleToMiddle.y = (isNaN(angleToMiddle.y)) ? 0 : angleToMiddle.y;
    angleToMiddle.z = (isNaN(angleToMiddle.z)) ? 0 : angleToMiddle.z;
}

function update(){
    updateAngle();
    updateRelativePosition();
    updateAngleToMiddle();
    noNaN();
}

function isInRange(angle, big, low){
    if (big > low){
        return (angle >= low && angle <= big);
    } else {
        return (angle <= low || angle >= big);
    }
}

export function isXFacingCamera(){
    let angleX1 = limiteAngle(angleToMiddle.x - Math.PI / 2);
    let angleX2 = limiteAngle(angleToMiddle.x + Math.PI / 2);

    // console.log(angles.x, angleX1, angleX2, isInRange(angles.x, angleX1, angleX2));

    return !isInRange(angles.x, angleX1, angleX2);
}

export function isYFacingCamera(){
    let angleY1 = limiteAngle(angleToMiddle.y - Math.PI / 2);
    let angleY2 = limiteAngle(angleToMiddle.y + Math.PI / 2);

    // console.log(angles.y, angleY1, angleY2, isInRange(angles.y, angleY1, angleY2));

    return !isInRange(angles.y, angleY1, angleY2);
}

export function isFacingCamera(){
    // console.log(isXFacingCamera(),isYFacingCamera(), angles.x, angles.y, angleToMiddle.x, angleToMiddle.y);
    let yy = (!isXFacingCamera()) ? !isYFacingCamera() : isYFacingCamera();
    let xx = (!isYFacingCamera()) ? !isXFacingCamera() : isXFacingCamera();
    return (yy && xx);
}

export function setData(x,y,z,rx,ry,rz,cx,cy,cz,crx,cry,crz){
    position.x = x;
    position.y = y;
    position.z = z;
    angles.x = rx;
    angles.y = ry-Math.PI;
    angles.z = rz;
    camPos.x = cx;
    camPos.y = cy;
    camPos.z = cz;
    camRot.x = crx;
    camRot.y = cry;
    camRot.z = crz;
    update();
}