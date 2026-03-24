import fs from "fs";
import { UserModel } from "../Models/user.model";
export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
export function saveData(fileUrl: string, data: object) {
  let dataArr: object[] = [];
  if (fs.existsSync(fileUrl)) {
    dataArr = JSON.parse(fs.readFileSync(fileUrl, "utf-8"));
  }
  dataArr.push(data);
  fs.writeFileSync(fileUrl, JSON.stringify(dataArr));
}
export function getLastUser(fileUrl: string) {
  let dataArr: UserModel[] = [];
  if (fs.existsSync(fileUrl)) {
    dataArr = JSON.parse(fs.readFileSync(fileUrl, "utf-8"));
  }
  return dataArr[dataArr.length - 1];
}
