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
Playlist.destroy_all
PlaylistTrack.destroy_all


demouser = User.create(email: 'demo@user.com', username: 'demouser', password: 'abcdegf')
klamar = User.create(email: 'klamarxoxo@aol.com', username: 'Kendrick Lamar', password:'asdfghj')
DUAL = User.create(email: 'asdfasasdf@aol.com', username: 'Dua Lipa', password:'asdfghj')
Taylor = User.create(email: 'Tyskhbwef', username: 'Taylor Swift', password:'asdfghj')
Green = User.create(email: 'klamaradfgawrxoxo@aol.com', username: 'Green Day', password:'asdfghj')
Miles = User.create(email: 'klamaegrqegewfgrxoxo@aol.com', username: 'Miles Davis', password:'asdfghj')
Coltrane = User.create(email: 'klamarxwefwefoxo@aolee.com', username: 'John Coltrane', password:'asdfghj')
Zeppelin = User.create(email: 'klasdfsfdmarxoxo@aol.com', username: 'Led Zeppelin', password:'asdfghj')
Lizzo = User.create(email: 'klamarwewexoxo@aol.com', username: 'Lizzo', password:'asdfghj')
Rocky = User.create(email: 'klawwwefefmarxoxo@aol.com', username: 'A$AP Rocky', password:'asdfghj')
Post = User.create(email: 'wwefwefklamarxoxo@aolwefwef.com', username: 'Post Malone', password:'asdfghj')
Ariana = User.create(email: 'klamaouiwnrfrxoxo@aol.com', username: 'Ariana Grande', password:'asdfghj')
Radiohead = User.create(email: 'klamadsadsarxoxo@aasdol.com', username: 'Radiohead', password:'asdfghj')
REM = User.create(email: 'klasdadsamarxoxo@aoadsadl.com', username: 'REM', password:'asdfghj')
Halen = User.create(email: 'klamkinwerfarxoxo@aol.com', username: 'Van Halen', password:'asdfghj')
Miguel = User.create(email: 'miguel@aol.com', username: 'Miguel', password:'asdfghj')
Ocean = User.create(email: 'frank@aol.com', username: 'Frank Ocean', password:'asdfghj')
Travis = User.create(email: 'kyliestorm@aol.com', username: 'Travis Scott', password:'asdfghj')
Billie = User.create(email: 'finnias@aol.com', username: 'Billie Eilish', password:'asdfghj')
Lana = User.create(email: 'lana@aol.com', username: 'Lana Del Rey', password:'asdfghj')
Toro = User.create(email: 'toro@aol.com', username: 'Toro y Moi', password:'asdfghj')
Pinegrove = User.create(email: 'pines@aol.com', username: 'Pinegrove', password:'asdfghj')
Styles = User.create(email: 'oned@aol.com', username: 'Harry Styles', password:'asdfghj')









KlamarProPic = open('https://notecloud-seeds.s3.amazonaws.com/Kendrick_Lamar.jpg')
KlamarCover = open('https://notecloud-seeds.s3.amazonaws.com/Kendrick_Cover.jpg')
klamar.profile_picture.attach({io: KlamarProPic, filename: 'Kendrick_Lamar.jpg'})
klamar.cover_photo.attach({io: KlamarCover, filename: 'Kendrick_Cover.jpg'})

DUAPic = open('https://notecloud-seeds.s3.amazonaws.com/DUALIPA.jpg')
DUAL.profile_picture.attach({io: DUAPic, filename: 'DUALIPA.jpg'})
DUACov = open('https://notecloud-seeds.s3.amazonaws.com/duaCov.jpg')
DUAL.cover_photo.attach({io: DUACov, filename: 'duaCov.jpg'})

TAYpic = open('https://notecloud-seeds.s3.amazonaws.com/TSWIFT.jpg')
Taylor.profile_picture.attach({io: TAYpic, filename: 'TSWIFT.jpg'})
TAYCOV = open('https://notecloud-seeds.s3.amazonaws.com/tcov.jpeg')
Taylor.cover_photo.attach({io: TAYCOV, filename: 'tcov.jpeg'})

GREENpic = open('https://notecloud-seeds.s3.amazonaws.com/GREEN.jpg')
Green.profile_picture.attach({io: GREENpic, filename: 'GREEN.jpg'})
GREENCOV = open('https://notecloud-seeds.s3.amazonaws.com/greencov.jpg')
Green.cover_photo.attach({io: GREENCOV, filename: 'greencov.jpg'})


Milespic = open('https://notecloud-seeds.s3.amazonaws.com/MILESD.jpg')
Miles.profile_picture.attach({io:Milespic, filename: 'MILESD.jpg'})
MILESCOV = open('https://notecloud-seeds.s3.amazonaws.com/milescov.jpg')
Miles.cover_photo.attach({io: MILESCOV, filename: 'milescov.jpg'})


Coltranepic = open('https://notecloud-seeds.s3.amazonaws.com/JCOLTRANE.jpg')
Coltrane.profile_picture.attach({io:Coltranepic, filename: 'JCOLTRANE.jpg'})
COLCOV = open('https://notecloud-seeds.s3.amazonaws.com/coltranecov.jpg')
Coltrane.cover_photo.attach({io: COLCOV, filename: 'coltranecov.jpg'})


zeppic = open('https://notecloud-seeds.s3.amazonaws.com/LEDZEP.jpg')
Zeppelin.profile_picture.attach({io:zeppic, filename: 'LEDZEP.jpg'})
ZEPCOV = open('https://notecloud-seeds.s3.amazonaws.com/ledcover.jpg')
Zeppelin.cover_photo.attach({io: ZEPCOV, filename: 'ledcover.jpg'})



Lizzopic = open('https://notecloud-seeds.s3.amazonaws.com/LIZZO.jpg')
Lizzo.profile_picture.attach({io:Lizzopic, filename:'LIZZO.jpg'})
LIZCOV = open('https://notecloud-seeds.s3.amazonaws.com/lizocov.jpg')
Lizzo.cover_photo.attach({io: LIZCOV, filename: 'lizocov.jpg'})


Rockypic = open('https://notecloud-seeds.s3.amazonaws.com/ASAP.jpeg')
Rocky.profile_picture.attach({io: Rockypic, filename:'ASAP.jpeg'})
asapcov = open('https://notecloud-seeds.s3.amazonaws.com/asapcov.jpg')
Rocky.cover_photo.attach({io: asapcov, filename: 'asapcov.jpg'})


Postpic = open('https://notecloud-seeds.s3.amazonaws.com/POSTMALONE.jpg')
Post.profile_picture.attach({io: Postpic, filename:'POSTMALONE.jpg'})
postcov = open('https://notecloud-seeds.s3.amazonaws.com/postcov.jpg')
Post.cover_photo.attach({io: postcov, filename: 'postcov.jpg'})

Arianapic = open('https://notecloud-seeds.s3.amazonaws.com/ARIANA.jpg')
Ariana.profile_picture.attach({io:Arianapic, filename: 'ARIANA.jpg'})
aricov = open('https://notecloud-seeds.s3.amazonaws.com/aricov.jpg')
Ariana.cover_photo.attach({io: aricov, filename: 'aricov.jpg'})

Radioheadpic = open('https://notecloud-seeds.s3.amazonaws.com/RADIOHEAD.jpg')
Radiohead.profile_picture.attach({io: Radioheadpic, filename: 'RADIOHEAD.jpg'})
radiocov = open('https://notecloud-seeds.s3.amazonaws.com/radiocov.jpg')
Radiohead.cover_photo.attach({io: radiocov, filename: 'radiocov.jpg'})

REMpic = open('https://notecloud-seeds.s3.amazonaws.com/REM.jpg')
REM.profile_picture.attach({io: REMpic, filename: 'REM.jpg'})
REMcov = open('https://notecloud-seeds.s3.amazonaws.com/remcov.jpg')
REM.cover_photo.attach({io: REMcov, filename: 'remcov.jpg'})

Halenpic = open('https://notecloud-seeds.s3.amazonaws.com/VAN+HALEN.jpeg')
Halen.profile_picture.attach({io: Halenpic, filename: 'VAN+HALEN.jpeg'})
halencov = open('https://notecloud-seeds.s3.amazonaws.com/vancov.jpg')
Halen.cover_photo.attach({io: halencov, filename: 'vancov.jpg'})

miguaelpro = open('https://notecloud-seeds.s3.amazonaws.com/miguelpro.jpg')
Miguel.profile_picture.attach({io: miguaelpro, filename: 'miguelpro.jpg'})
miguelcov = open('https://notecloud-seeds.s3.amazonaws.com/milescov.jpg')
Miguel.cover_photo.attach({io: miguelcov, filename: 'milescov.jpg'})

frankpro = open('https://notecloud-seeds.s3.amazonaws.com/frankpro.jpg')
Ocean.profile_picture.attach({io: frankpro, filename: 'frankpro.jpg'})
frankcov = open('https://notecloud-seeds.s3.amazonaws.com/frankcov.jpg')
Ocean.cover_photo.attach({io: frankcov, filename: 'frankcov.jpg'})

scottpro = open('https://notecloud-seeds.s3.amazonaws.com/scottpro.jpg')
Travis.profile_picture.attach({io: scottpro, filename: 'scottpro.jpg'})
scottcov = open('https://notecloud-seeds.s3.amazonaws.com/scottcov.jpg')
Travis.cover_photo.attach({io: scottcov, filename: 'scottcov.jpg'})

billiepro = open('https://notecloud-seeds.s3.amazonaws.com/billiepro.jpg')
Billie.profile_picture.attach({io: billiepro, filename: 'billiepro.jpg'})
billiecov = open('https://notecloud-seeds.s3.amazonaws.com/billiecov.jpg')
Billie.cover_photo.attach({io: billiecov, filename: 'billiecov.jpg'})

lanapro = open('https://notecloud-seeds.s3.amazonaws.com/lanapro.jpg')
Lana.profile_picture.attach({io: lanapro, filename: 'lanapro.jpg'})
lanacov = open('https://notecloud-seeds.s3.amazonaws.com/lanacov.jpg')
Lana.cover_photo.attach({io: lanacov, filename: 'lanacov.jpg'})

toropro = open('https://notecloud-seeds.s3.amazonaws.com/toropro.jpg')
Toro.profile_picture.attach({io: toropro, filename: 'toropro.jpg'})
torocov = open('https://notecloud-seeds.s3.amazonaws.com/torocov.jpg')
Toro.cover_photo.attach({io: torocov, filename: 'torocov.jpg'})

pinepro = open('https://notecloud-seeds.s3.amazonaws.com/pinepro.jpg')
Pinegrove.profile_picture.attach({io: pinepro, filename: 'pinepro.jpg'})
pinecov = open('https://notecloud-seeds.s3.amazonaws.com/pinecov.jpg')
Pinegrove.cover_photo.attach({io: pinecov, filename: 'pinecov.jpg'})

stylespro = open('https://notecloud-seeds.s3.amazonaws.com/stylespro.jpeg')
Styles.profile_picture.attach({io: stylespro, filename: 'stylespro.jpeg'})
stylescov = open('https://notecloud-seeds.s3.amazonaws.com/stylescov.jpg')
Styles.cover_photo.attach({io: stylescov, filename: 'stylescov.jpg'})




demouserPro = open('https://notecloud-seeds.s3.amazonaws.com/Demo_Profile.png')
demouserCov = open('https://notecloud-seeds.s3.amazonaws.com/Demo_Cover.jpeg')

demouser.profile_picture.attach({io: demouserPro, filename: 'Demo_Profile.png', content_type: 'image/png'})
demouser.cover_photo.attach({io: demouserCov, filename: 'Kendrick_Cover.jpg'})

humble = Song.create(title: 'HUMBLE', user_id: klamar.id, genre: 'rap', hyperlink: 'HUMBLE', plays: 100)

humble_track = open('https://notecloud-seeds.s3.amazonaws.com/08+HUMBLE..m4a')

humble_picture = open('https://notecloud-seeds.s3.amazonaws.com/Humble.jpg')
humble.track.attach({io: humble_track, filename: '08 HUMBLE..m4a'})
humble.photo.attach({io: humble_picture, filename: 'Humble.jpg'})

Dont = Song.create(title: "Don't Start Now", user_id: DUAL.id, genre: 'Pop', hyperlink: 'DontStart', plays: 60)
Donttrack = open("https://notecloud-seeds.s3.amazonaws.com/01+Don't+Start+Now.m4a")
Dont.track.attach({io: Donttrack, filename: "01 Don't Start Now.m4a"})
Dontpic = open('https://notecloud-seeds.s3.amazonaws.com/DUALIPA.jpg')
Dont.photo.attach({io: Dontpic, filename: 'DUALIPA.jpg'})

Lights = Song.create(title: "Lights Up", user_id: Styles.id, genre: 'Rock', hyperlink: 'LightsUp', plays: 90)
LightsTrack = open('https://notecloud-seeds.s3.amazonaws.com/04+Lights+Up.m4a')
Lights.track.attach({io: LightsTrack, filename: '04 Lights Up.m4a'})
Lightspic = open('https://notecloud-seeds.s3.amazonaws.com/harryS.jpeg')
Lights.photo.attach({io: Lightspic, filename: 'harryS.jpeg'})

Nikes = Song.create(title: "Nikes", user_id: Ocean.id, genre: 'SadBoy', hyperlink: 'Nikes', plays: 20)
NikesTrack = open('https://notecloud-seeds.s3.amazonaws.com/01+Nikes.m4a')
Nikes.track.attach({io: NikesTrack, filename: '01 Nikes.m4a'})
Nikespic = open('https://notecloud-seeds.s3.amazonaws.com/FRANKOCEAN.jpeg')
Nikes.photo.attach({io: Nikespic, filename: 'FRANKOCEAN.jpeg'})

Monte = Song.create(title: "Monte Carlo", user_id: Toro.id, genre: 'Chill', hyperlink: 'MonteCarlo', plays: 680)
MonteTrack = open('https://notecloud-seeds.s3.amazonaws.com/09+Monte+Carlo+(feat.+Wet).m4a')
Monte.track.attach({io: MonteTrack, filename:'09 Monte Carlo (feat. Wet).m4a' })
MontePic = open('https://notecloud-seeds.s3.amazonaws.com/TORIMOI.jpg')
Monte.photo.attach({io: MontePic, filename: 'TORIMOI.jpg'})

Greatest = Song.create(title: "The Greatest", user_id: Lana.id, genre: 'Indie', hyperlink: 'Greatest', plays: 90)
GreatestTrack = open('https://notecloud-seeds.s3.amazonaws.com/11+The+greatest.m4a')
Greatest.track.attach({io: GreatestTrack, filename: '11 The greatest.m4a'})
Greatestpic = open('https://notecloud-seeds.s3.amazonaws.com/LANADEL.jpg')
Greatest.photo.attach({io: Greatestpic, filename: 'LANADEL.jpg'})

Adorn = Song.create(title: 'Adorn', user_id: Miguel.id, genre: 'R&B', hyperlink: 'adorn', plays: 25)
AdornTrack = open('https://notecloud-seeds.s3.amazonaws.com/01+Adorn.m4a')
Adorn.track.attach({io: AdornTrack, filename: '01 Adorn.m4a'})
adornpic = open('https://notecloud-seeds.s3.amazonaws.com/adornpic.jpeg')
Adorn.photo.attach({io: adornpic, filename: 'adornpic.jpeg'})

Chanel = Song.create(title: "Chanel", user_id: Ocean.id, genre: 'R&B', hyperlink: 'Chanel', plays: 30)
ChanelTrack = open('https://notecloud-seeds.s3.amazonaws.com/01+Chanel.m4a')
Chanel.track.attach({io: ChanelTrack, filename: '01 Chanel.m4a'})
chanelpic = open('https://notecloud-seeds.s3.amazonaws.com/chanelpic.jpg')
Chanel.photo.attach({io: chanelpic, filename: 'chanelpic.jpg'})

Highest = Song.create(title: "HIGHEST IN THE ROOM", user_id: Travis.id, genre: 'RAP', hyperlink: 'HIGHEST', plays: 300)
HighestTrack = open('https://notecloud-seeds.s3.amazonaws.com/01+HIGHEST+IN+THE+ROOM.m4a')
Highest.track.attach({io: HighestTrack, filename: '01 HIGHEST IN THE ROOM.m4a'})
highestpic = open('https://notecloud-seeds.s3.amazonaws.com/highestpic.jpg')
Highest.photo.attach({io: highestpic, filename: 'highestpic.jpg'})

Manmoon = Song.create(title: "Man on the Moon", user_id: REM.id, genre: 'Alternative', hyperlink: 'Manonthemoon', plays: 200)
moontrack = open('https://notecloud-seeds.s3.amazonaws.com/01+Man+on+the+Moon.m4a')
Manmoon.track.attach({io: moontrack, filename: '01 Man on the Moon.m4a'})
moonpic = open('https://notecloud-seeds.s3.amazonaws.com/moonpic.jpg')
Manmoon.photo.attach({io: moonpic, filename: 'moonpic.jpg'})

Cruelsum = Song.create(title: "Cruel Summer", user_id: Taylor.id, genre: 'Pop', hyperlink: 'Cruel', plays: 260)
summertrack = open('https://notecloud-seeds.s3.amazonaws.com/02+Cruel+Summer.m4a')
Cruelsum.track.attach({io: summertrack, filename: '02 Cruel Summer.m4a'})
cruelpic = open('https://notecloud-seeds.s3.amazonaws.com/cruelsumpic.jpg')
Cruelsum.photo.attach({io: cruelpic, filename: 'cruelsumpic.jpg'})

Sunflower = Song.create(title: "Sunflower", user_id: Post.id, genre: 'Pop', hyperlink: 'Sunflower', plays: 280)
suntrack = open('https://notecloud-seeds.s3.amazonaws.com/02+Sunflower+(Spider-Man_+Into+the+Spider-Verse).m4a')
Sunflower.track.attach({io: suntrack, filename: '02 Sunflower (Spider-Man Into the Spider-Verse).m4a'})
sunpic = open('https://notecloud-seeds.s3.amazonaws.com/sunflowerpic.jpg')
Sunflower.photo.attach({io: sunpic, filename: 'sunflowerpic.jpg'})

Thinkin = Song.create(title: "Thinkin Bout You", user_id: Ocean.id, genre: 'R&B', hyperlink: 'thinkin', plays: 480)
thinkintrack = open('https://notecloud-seeds.s3.amazonaws.com/02+Thinkin+Bout+You.m4a')
Thinkin.track.attach({io: thinkintrack, filename: '02 Thinkin Bout You.m4a'})
thinkinpic = open('https://notecloud-seeds.s3.amazonaws.com/thinkpic.jpg')
Thinkin.photo.attach({io: thinkinpic, filename: 'thinkpic.jpg'})

Watermelon = Song.create(title: "Watermelon Sugar", user_id: Styles.id, genre: 'R&B', hyperlink: 'watermelon', plays: 480)
watermelontrack = open('https://notecloud-seeds.s3.amazonaws.com/02+Watermelon+Sugar.m4a')
Watermelon.track.attach({io: watermelontrack, filename: '02 Watermelon Sugar.m4a'})
watermelonpic = open('https://notecloud-seeds.s3.amazonaws.com/watermelonpic.jpg')
Watermelon.photo.attach({io: watermelonpic, filename: 'watermelonpic.jpg'})

Badguy = Song.create(title: "Bad Guy", user_id: Billie.id, genre: 'Spooky', hyperlink: 'badguy', plays: 180)
badguytrack = open('https://notecloud-seeds.s3.amazonaws.com/02+bad+guy.m4a')
Badguy.track.attach({io: badguytrack, filename: '02 bad guy.m4a'})
badguypic = open('https://notecloud-seeds.s3.amazonaws.com/badguypic.jpg')
Badguy.photo.attach({io: badguypic, filename: 'badguypic.jpg'})

Adore = Song.create(title: "Adore You", user_id: Styles.id, genre: 'New Music', hyperlink: 'AdoreYou', plays: 500)
adoretrack = open('https://notecloud-seeds.s3.amazonaws.com/03+Adore+You.m4a')
Adore.track.attach({io: adoretrack, filename: '03 Adore You.m4a'})

play1 = Playlist.create(user_id: demouser.id, title: "80's Metal", permalink: "80sMetal")
play1pic = open('https://notecloud-seeds.s3.amazonaws.com/80METAL.jpg')
play1.photo.attach({io: play1pic, filename: '80METAL.jpg'})
play2 = Playlist.create(user_id: Styles.id, title: "Indie Rock", permalink: "IndieRock")
play2pic = open('https://notecloud-seeds.s3.amazonaws.com/INDIEROCK.jpg')
play2.photo.attach({io: play2pic, filename: 'INDIEROCK.jpg'})
play3 = Playlist.create(user_id: demouser.id, title: "New Hip Hop", permalink: "NewHop")
play3pic = open('https://notecloud-seeds.s3.amazonaws.com/NEWHIPHOP.jpg')
play3.photo.attach({io: play3pic, filename: 'NEWHIPHOP.jpg'})
play4 = Playlist.create(user_id: Ocean.id, title: "Fresh Pressed Tracks", permalink: "Fresh")
play4pic = open('https://notecloud-seeds.s3.amazonaws.com/NEWMUSIC.png')
play4.photo.attach({io: play4pic, filename: 'NEWMUSIC.png'})
play5 = Playlist.create(user_id: klamar.id, title: "Drum & Bass", permalink: "DrumB")
play5pic = open('https://notecloud-seeds.s3.amazonaws.com/DRUMANDBASS.jpeg')
play5.photo.attach({io: play5pic, filename: 'DRUMANDBASS.jpeg'})
play6 = Playlist.create(user_id: klamar.id, title: "Classical", permalink: "Classic")
play6pic = open('https://notecloud-seeds.s3.amazonaws.com/CLASSICAL.jpeg')
play6.photo.attach({io: play6pic, filename: 'CLASSICAL.jpeg'})
play7 = Playlist.create(user_id: demouser.id, title: "Best Country Now", permalink: "Cantry")
play7pic = open('https://notecloud-seeds.s3.amazonaws.com/COUNTRY.gif')
play7.photo.attach({io: play7pic, filename: 'COUNTRY.gif'})
play8 = Playlist.create(user_id: demouser.id, title: "Live Electronic", permalink: "Rave")
play8pic = open('https://notecloud-seeds.s3.amazonaws.com/EDM.jpg')
play8.photo.attach({io: play8pic, filename: 'EDM.jpg'})
play9 = Playlist.create(user_id: demouser.id, title: "90's Punk", permalink: "90Punk")
play9pic = open('https://notecloud-seeds.s3.amazonaws.com/90PUNK.jpg')
play9.photo.attach({io: play9pic, filename: '90PUNK.jpg'})
play10 = Playlist.create(user_id: klamar.id, title: "Trending", permalink: "TrendSetter")
play10pic = open('https://notecloud-seeds.s3.amazonaws.com/TRENDING.jpg')
play10.photo.attach({io: play10pic, filename: 'TRENDING.jpg'})
play11 = Playlist.create(user_id: demouser.id, title: "Hip-Hop Party Starters", permalink: "PartyStarters")
play11pic = open('https://notecloud-seeds.s3.amazonaws.com/HIPHOPPARTY.jpg')
play11.photo.attach({io: play11pic, filename:'HIPHOPPARTY.jpg'})
play12 = Playlist.create(user_id: demouser.id, title: "Chill Pop", permalink: "ChillPop")
play12pic = open('https://notecloud-seeds.s3.amazonaws.com/CHILLPOP.jpg')
play12.photo.attach({io: play12pic, filename: 'CHILLPOP.jpg'})
play13 = Playlist.create(user_id: demouser.id, title: "Lo-Fi Beats", permalink: "LoFiBeat")
play13pic = open('https://notecloud-seeds.s3.amazonaws.com/LOFI.jpeg')
play13.photo.attach({io: play13pic, filename: 'LOFI.jpeg'})
play14 = Playlist.create(user_id: demouser.id, title: "Latin", permalink: "Latin")
play14pic = open('https://notecloud-seeds.s3.amazonaws.com/LATIN.jpg')
play14.photo.attach({io: play14pic, filename: 'LATIN.jpg'})
play15 = Playlist.create(user_id: demouser.id, title: "Positive Dance Vibes", permalink: "PDV")
play15pic = open('https://notecloud-seeds.s3.amazonaws.com/CLUB.jpg')
play15.photo.attach({io: play15pic, filename: 'CLUB.jpg'})
play16 = Playlist.create(user_id: klamar.id, title: "R&B Workout", permalink: "RBWorkout")
play16pic = open('https://notecloud-seeds.s3.amazonaws.com/RBWORK.jpg')
play16.photo.attach({io: play16pic, filename: 'RBWORK.jpg'})

PlaylistTrack.create(track_id: humble.id, playlist_id: play16.id)
Follow.create(user_id: demouser.id, follower_id: klamar.id)