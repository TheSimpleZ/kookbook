import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-storage'
import { firebase_config } from '../firebase_config'

firebase.initializeApp(firebase_config)

const Firestore = firebase.firestore()
const Auth = firebase.auth()
const Storage = firebase.storage()

export { Firestore, Auth, Storage, firebase }
