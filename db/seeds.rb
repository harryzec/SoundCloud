# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.destroy_all
Song.destroy_all

demouser = User.create(email: 'demo@user.com', username: 'demouser', password: 'abcdegf')
klamar = User.create(email: 'klamarxoxo@aol.com', username: 'klamarxoxo', password:'asdfghj')

KlamarProPic = open('https://notecloud-seeds.s3.amazonaws.com/Kendrick_Lamar.jpg')
KlamarCover = open('https://notecloud-seeds.s3.amazonaws.com/Kendrick_Cover.jpg')
klamar.profile_picture.attach({io: KlamarProPic, filename: 'Kendrick_Lamar.jpg'})
klamar.cover_photo.attach({io: KlamarCover, filename: 'Kendrick_Cover.jpg'})

demouserPro = open('https://notecloud-seeds.s3.amazonaws.com/Demo_Profile.png')
demouserCov = open('https://notecloud-seeds.s3.amazonaws.com/Demo_Cover.jpeg')

demouser.profile_picture.attach({io: demouserPro, filename: 'Demo_Profile.png', content_type: 'image/png' })
demouser.cover_photo.attach({io: demouserCov, filename: 'Kendrick_Cover.jpg'})

humble = Song.create(title: 'HUMBLE', user_id: klamar.id, genre: 'rap', hyperlink: 'HUMBLE')

humble_track = open('https://notecloud-seeds.s3.amazonaws.com/08+HUMBLE..m4a')

humble_picture = open('https://notecloud-seeds.s3.amazonaws.com/Humble.jpg')
humble.track.attach({io: humble_track, filename: '08 HUMBLE..m4a'})
humble.photo.attach({io: humble_picture, filename: 'Humble.jpg'})