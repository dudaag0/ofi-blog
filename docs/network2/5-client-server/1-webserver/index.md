---
sidebar_custom_props:
  id: 567f80d1-a99a-4e80-b3be-5b4e66530be0
---
# :extra: Eigener Webserver
---

::: exercise Starte deinen eigenen Webserver

Normalerweise müsste man eine Webseite auf einem Server im Internet veröffentlichen, sonst kann sie nicht erreicht 
werden. Dein Computer steht nicht direkt im Internet, jedoch bei uns im WLAN des Gymers. Wenn wir darauf einen Webserver 
starten, so können alle anderen Geräte am Gymer auf diese Seite zugreifen.

### Starte deinen Webserver

Wir gehen wie folgt vor:

- starte Thonny und öffne die index.html Datei aus den Webseitenaufgaben
- klicke auf den grünen Run-Knopf – wie wenn du ein Python-Programm starten möchtest. (Das gibt zwar einen Fehler, aber 
Thonny merkt sich so das aktuelle Verzeichnis, was für den nächsten Schritt wichtig ist.)
- wähle im Menu unter _Werkzeuge_ den Eintrag _System Terminal öffnen_
- überprüfe das Verzeichnis: ist es dasjenige, in welchem deine Webseiten-Dateien sind?
- tippe den untenstehenden Befehl ab, damit ein Server gestartet wird

```batch
python -m http.server
```

oder ev. falls `python` nicht gefunden wird:

```batch
python3 -m http.server
```

Wenn sich ein Fenster der Windows Firewall (Windows Defender) öffnet, setze ein Häckchen bei "Private Netzwerke" und klicke auf "Zugriff zulassen".
Du solltest den folgenden Output erhalten:

    Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...

- öffne einen Browser und besuche die folgende Webseite: [http://localhost:8000/](http://localhost:8000/)
- um den Server zu beenden, wechselst du zum Terminal und drückst [[Ctrl]]+[[C]]

### Besuche eine Webseite

- Stelle sicher, dass dein Kollege/deine Kollegin den Webserver gestartet hat und erkundige dich nach dessen/deren IP-Adresse.
- Gib diese in der Adresszeile deines Browsers ein, gefolgt von `:8000` (die Zahl hinter dem `:` ist der `port`)
- Also z.B: [http://192.168.48.23:8000](http://192.168.48.23:8000)

### Webserver starten und testen

Befolge die obenstehenden Anweisungen:

1. Starte einen Webserver in deinem Web-Verzeichnis (dort wo deine html-Dateien sind)
2. Teste, ob dein Webserver läuft (besuche: [http://localhost:8000/](http://localhost:8000/))
3. Veröffentliche deine IP-Adresse im Informatik-Kurs-Team
4. Besuche die Webseiten deiner Kolleginnen und Kollegen


::: info Hinweis «Standardseite»

Gibt man beim Aufrufen einer URI keine Datei an, so wird versucht ein Standarddokument aufzurufen. Dabei handelt es sich meist um die Datei `index.html`.

Wenn du also [http://localhost:8000/](http://localhost:8000/) aufrufst, dann versucht der Webserver die Datei `index.html` zu liefern. Findet er diese nicht, gibt es einen 404-Error (bei den meisten «echten» Webservern), oder er liefert eine Liste aller Dateien im Verzeichnis (ist bei unserem Python-Webserver der Fall).

:::