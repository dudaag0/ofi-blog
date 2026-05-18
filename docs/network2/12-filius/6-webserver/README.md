---
sidebar_custom_props:
  id: b28676d4-0805-4559-954e-7e0d05e62573
---
# 12.6 Webserver einrichten[^1]
---

<VueVideo id="rmGOfuXW_nI"/>

::: info
#### :mdi-lightbulb-on: Client-Server-Prinzip
Die grundlegende Idee des **Client-Server-Prinzips** ist: **Der Kunde (engl. *client*) fordert beim Diener/Anbieter (engl. *server*) eine Auskunft oder einen Dienst an.** Dieser Dienst wird dann vom Serverprogramm erledigt. So können von einem Client auch mehrere Dienste bei verschiedenen Serverprogrammen auf verschiedenen Computern angefordert werden. Der Vorteil ist dabei, dass die Leistung des Clients dadurch nicht so stark beeinträchtigt wird.

Server-Beispiele sind: Datei-Server, Druck-Server, Web-Server, Mail-Server usw.

Damit die Kommunikation funktioniert, muss für jeden Dienst ein bestimmtes **Regelwerk** vereinbart werden. Dieses nennt man *Protokoll*.

Es ist wichtig zu beachten, dass mit Server theoretisch nur die Server-Programme bezeichnet werden. Häufig nennt man aber auch spezielle Computer Server. Das tut man aber nur, da diese Computer ausschliesslich dazu benutzt werden, um Server-**Programme** auszuführen und sonst nichts anderes.
:::

::: info
#### :mdi-lightbulb-on: Das «Internet» mit nur einem Webserver.
Jetzt wollen wir unser eigenes, kleines Internet erstellen.

Wir kennen das Internet aus dem Webbrowser. Dort geben wir Adressen (wie www.web.de) ein und sehen «bunte Seiten». Das wollen wir so «nachbauen». Dafür benötigen wir eine Software, die sich «Webserver» nennt.

**Kurzinfo zu Webservern:**
Ein Webserver ist eine Software. Ihre Aufgabe ist es, Dokumente und Dateien an einen Client zu übertragen. Der Standardclient für einen Webserver ist ein Webbrowser. Die kennst du sicher: Firefox, Chrome usw.

Die Hauptaufgabe von Webservern ist es, Dateien bereitzuhalten, die Webseiten beinhalten. Diese bestehen u.A. aus «HTML-Dateien». HTML steht für *Hypertext Markup Language*, also einer Auszeichnungssprache für Texte, die mit Links verknüpft werden können.

In HTML-Dateien wiederum können Bilddateien, Videodateien uvm. verlinkt und angezeigt werden.

Für eine komplette Webseite werden in der Regel die HTML-Seite inklusive verknüpfter
- Designbeschreibungen (CSS) und
- Bilddateien (JPG, PNG, GIF, SVG)
jeweils als einzelne Dateien übertragen.

Für jede benötigte Datei muss der Webbrowser eine eigene Anfrage an den Webserver senden, d.h. zur Darstellung einer komplexen Webseite sind manchmal hunderte Anfragen und Serverantworten nötig.

Ein Webserver ist in der Lage, die Inhalte einer Webseite gleichzeitig auf viele verschiedene Computer auszuliefern.
:::

::: exercise Aufgabe 6

Mein eigenes «Web».
1. Installiere auf dem **Webserver** einen _Webserver_ und einen _Texteditor_.
1. Öffne mit dem Texteditor die Datei __index.html__. Du findest sie im Verzeichnis __root/webserver__.
1. Gib den unten stehenden Code-Block für __index.html__ ein. **Achtung**: jedes Zeichen ist wichtig!
1. Speichere das Dokument ab und schliesse es.
1. Erstelle ein neues Dokument, das du unter dem Namen __kontakt.html__ speicherst.
1. Gib den nächsten Code-Block unten als Inhalt für __kontakt.html__ ein, speichere ab und schliesse den Editor.
1. Öffne die Software _Webserver_ mit einem Doppelklick und starte den Webserver durch einen Klick auf den entsprechenden Knopf.
1. **Abschluss:** Bitte speichere die fertige Aufgabe unter dem Namen _Aufgabe-06.fls_ ab.
:::

#### Datei index.html

```html
<html>
  <head>
    <title>Standardseite</title>
  </head>
  <body bgcolor="#ccddff">
    <h2> Meine eigene Seite! </h2>
    <p>Herzlich Willkommen auf meiner Webseite</p>
    <p> Ich freue mich, dass Sie diese Seite besuchen. </p>
    <p><a href=kontakt.html>Kontaktseite</a></p>
  </body>
</html>
```

#### Datei kontakt.html

```html
<html>
  <head>
    <title>Kontakt</title>
  </head>
  <body bgcolor="red">
    <h1> Meine Kontaktseite </h1> <p>Name: Superhacker</p>
    <p> Telefon: 0196336995</p>
    <p> Email: superhacker@web.de</p>
  </body>
</html>
```

[^1]: Quelle: Adrian Sauer (2020), [Interaktiver Kurs zu Rechnernetzen](https://www.tutory.de/w/c4ae6cde), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
