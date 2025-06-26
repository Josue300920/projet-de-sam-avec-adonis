const video = document.getElementById('bg-video')

// Liste des vidéos à alterner
const videos = [
    '/images/8426131-uhd_1440_2560_25fps.mp4',
    '/images/6616741-uhd_4096_2160_25fps.mp4',
  '/images/9773341-hd_1080_2048_25fps.mp4',
]

let current = 0

// Fonction pour passer à la vidéo suivante
function nextVideo() {
  current = (current + 1) % videos.length
  video.src = videos[current]
  video.load()
  video.play()
}

// Alterne toutes les 20 secondes (ajuste selon la durée de tes vidéos)
setInterval(nextVideo, 30000)