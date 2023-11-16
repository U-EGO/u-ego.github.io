import { getAngleToMiddleCords } from "./main.js"

const position = [
    {
        start: 0,
        end: 0,
        id: "home",
        cam_x: 0,
        cam_y: 1,
        cam_z: 45,
        cam_rotateX: 0,
        cam_rotateY: 0,
        cam_rotateZ: 0,
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: -getAngleToMiddleCords(0,45),
        rotateZ: 0,
        scale: 1
    },
    {
        start: 0,
        end: 100,
        id: "about",
        cam_x: 0,
        cam_y: 1,
        cam_z: 45,
        cam_rotateX: 0,
        cam_rotateY: 0,
        cam_rotateZ: 0,
        x: -20,
        y: 5,
        z: 10,
        rotateX: 0,
        rotateY: getAngleToMiddleCords(-15, 45),
        rotateZ: -Math.PI / 2,
        scale: 1
    },
    {
        start: 100,
        end: 200,
        id: "feature1",
        cam_x: 0,
        cam_y: 1,
        cam_z: 45,
        cam_rotateX: 0,
        cam_rotateY: 0,
        cam_rotateZ: 0,
        x: -20,
        y: 1,
        z: 0,
        rotateX: 0,
        rotateY: getAngleToMiddleCords(-20, 45),
        rotateZ: 0,
        scale: 1
    }
]

export function getPosition() {
    return position;
}