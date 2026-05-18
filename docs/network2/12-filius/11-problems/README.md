---
sidebar_custom_props:
  id: 4d939cfd-267b-4a10-9552-35912fe5762b
---
# 12.11 Häufige Probleme
---

::: info
#### :mdi-lightbulb-on: «Hilfe, das Internet geht nicht!»
Dies ist eine oft gehörte Aussage – allerdings ist sie schlicht falsch.

Wir wollen versuchen, diese Probleme systematisch anzugehen, einzugrenzen und zu lösen. Dazu denken wir immer wieder an das bekannte Schichtenmodell mit den vier Schichten:

- Anwendungsschicht
- Transportschicht
- Vermittlungsschicht
- Physikalischen Schicht (Netzzugangsschicht)
:::

Um ein vorhandenes Problem – sei es in Filius oder im Computeralltag – zu lösen, gehen wir in Gedanken die Schichten durch, um das Problem einzugrenzen.

## Probleme auf der physikalischen Schicht (Netzzugangsschicht)
Die Probleme, die hier auftreten können, sind grundlegender Natur:

- Sind alle Kabel eingesteckt?
- Sind alle benötigten Geräte vorhanden und eingeschaltet?
- Habe ich an der gewünschten Stelle WLAN-Empfang?

## Probleme auf der Vermittlungsschicht
Hier geht es um die Adressierung (IP-Adresse):

- Ist bei allen Geräten die richtige IP-Adresse konfiguriert?
- Ist (falls nötig) ein Gateway eingetragen? Ist dessen IP-Adresse korrekt?

::: info
#### :mdi-lightbulb-on: Ping probieren
Wenn ping funktioniert, stimmen die untersten beiden Schichten.
:::

## Probleme auf der Transportschicht
Im Alltag werden Probleme auf dieser Schicht häufig verursacht durch eine Firewall. Das heisst, bestimmte Ports zu Serverdiensten (DNS, HTTP, ...) sind gesperrt, so dass solche Pakete blockiert werden.

Es könnte aber auch sein, dass der gewünschte Serverdienst nicht läuft (also dass die DNS-Server- oder Webserver-Software nicht gestartet ist). Dann gibt es auf diesen Ports kein Programm, das antwortet - was ähnlich aussieht wie eine Firewall, die entsprechende Pakete blockiert.

Zudem könnte das Netzwerk überlastet sein, weil zu viele Benutzer online sind oder zu viele Daten übertragen werden. Dann gibt es Stau, gewisse Pakete gehen verloren und müssen neu geschickt werden, was noch mehr Verkehr und Stau verursacht.

## Probleme auf der Anwendungsschicht
Obwohl also z.B. Ping funktioniert, wird beim Aufrufen einer Webseite eine Fehlermeldung angezeigt. Dies kann mehrere Gründe haben:

- DNS
- HTTP

D.h. es kann sein, dass der Webserver richtig funktioniert, der Hostname kann aber nicht per DNS in eine IP-Adresse aufgelöst werden. Grund dafür:

- Der DNS-Server enthält keinen resp. einen fehlerhaften Eintrag für den gesuchten Hostnamen.

::: info
#### :mdi-lightbulb-on: DNS-Auflösung testen
Wenn der Befehl `host www.webseite.ch` (in Filius) resp. `nslookup  www.webseite.ch` (unter Windows) die richtige Antwort liefert, funktioniert DNS korrekt.
:::

Nun muss noch der Webserver überprüft werden:

- Ist die angeforderte Webseite vorhanden?
- Stimmen die Links auf der Webseite?

::: exercise
#### :exercise: Aufgaben
Das Ziel in all den nachfolgenden Aufgaben/Situationen ist stets dasselbe:

Jeder vorhandene Client soll im Browser die angegebene Webseite vollständig (Seite wird inkl. Bilder sichtbar, Links funktionieren) anzeigen können. Die Adresse der Webseite ist jeweils in Klammern beim Namen des Webservers angegeben.

Lade die jeweilige Filius-Datei herunter und öffne sie. Analysiere das Problem und versuche, es zu beheben.

Notiere dir jeweils, auf welcher Schicht das Problem liegt und wie du es gelöst hast!

1. [Problem 1](exercises/problem-1.fls)
2. [Problem 2](exercises/problem-2.fls)
3. [Problem 3](exercises/problem-3.fls)
4. [Problem 4](exercises/problem-4.fls)
5. [Problem 5](exercises/problem-5.fls)
6. [Problem 6](exercises/problem-6.fls)
7. [Problem 7](exercises/problem-7.fls)
8. [Problem 8](exercises/problem-8.fls)
***
1. Der DNS-Server ist nicht im Netzwerk verbunden (Kabelverbindung fehlt). \
Betroffene Schicht: Physikalische Schicht.
2. Das Gateway bei Client 1 ist nicht eingetragen. Der Eintrag lautet `192.168.0.1`. \
Betroffene Schicht: Vermittlungsschicht.
3. Der DNS Server ist nicht gestartet. \
Betroffene Schicht: Transportschicht.
4. Die IP-Adresse im DNS-Eintrag ist fehlerhaft. Die korrekte IP-Adresse lautet `130.92.64.4`. \
Betroffene Schicht: Anwendungsschicht.
5. Der Webserver games.ch ist nicht gestartet. \
Betroffene Schicht: Transportschicht.
6. Bei Client 2 ist ein falscher Wert für das Gateway eingetragen. Das Gateway lautet `10.0.0.1`. \
Betroffene Schicht: Vermittlungsschicht.
7. Es fehlt ein Router, um die beiden Netzwerke miteinander zu verbinden. \
Betroffene Schicht: Physikalische Schicht.
8. In der Datei __index.html__ ist der Link nicht korrekt angegeben.
Der Link sollte wie folgt aussehen:
```html
<p><a href="abkuerzungen.html">wichtige Abkürzungen</a>
``` 
Betroffene Schicht: Anwendungsschicht.
:::
