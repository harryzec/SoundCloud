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

User.create(email: 'demo@user.com', username: 'demouser', password: 'abcdegf')
klamar = User.create(email: 'klamarxoxo@aol.com', username: 'klamarxoxo', password:'asdfghj')

humble = Song.create(title: 'HUMBLE', user_id: klamar.id, genre: 'rap')

humble_track = open('https://notecloud-seeds.s3.amazonaws.com/08+HUMBLE..m4a')

humble.track.attach({io: humble_track, filename: '08 HUMBLE..m4a'})