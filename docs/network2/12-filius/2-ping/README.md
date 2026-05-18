---
sidebar_custom_props:
  id: b50db396-3057-441d-8925-de5f2cdfcaf7
---
# 12.2 Ping[^1]
---

<VueVideo id="iZ8l-DkckZE"/>

::: warning
#### :warning: Achtung
Schaue nur die ersten 90s des Videos, also bis 1:30 (ohne Datenaustausch-Fenster).
:::

::: info
#### :mdi-lightbulb-on: Ping
Um zu überprüfen, ob ein anderer Computer im Netzwerk erreicht werden kann, nutzt man den `ping`-Befehl und die IP-Adresse des anderen PCs:

```
ping 192.168.0.11
```
:::

::: exercise
#### :exercise: Aufgabe 2

Jetzt wollen wir das Mini-Netzwerk testen:
1. Installiere auf dem **NB 1** eine _Befehlszeile_.
1. Starte die Befehlszeile und teste die Verbindung zum Notebook **NB 2** mit dem Befehl `ping` und dessen IP-Adresse.
1. Beobachte die Ausgabe des `ping`-Befehls und achte auf allfällige Fehler.
1. Teste auch den Befehl `ipconfig` auf der Befehlszeile. Was wird hier angezeigt?
1. Was passiert, wenn du den Befehl `ping 10.200.0.99` ausführst? Überlege, bevor du es ausprobierst, ob du richtig liegst.
1. Was passiert, wenn du den Befehl `ping 192.168.0.10` ausführst? Überlege, bevor du es ausprobierst, ob du richtig liegst.
1. **Abschluss:** Bitte speichere die fertige Aufgabe unter dem Namen _Aufgabe-02.fls_ ab.
***
1. -&nbsp;
1. -&nbsp;
1. Wenn du deinem zweiten Notebook eine IP-Adresse gegeben hast, die **nicht** mit `10.200.0` beginnt, dann funktioniert der `ping`-Befehl nicht. Korrigiere daher falls nötig die IP-Adresse.
1. -&nbsp;
1. -&nbsp;
1. -&nbsp;
1. -&nbsp;
***
1. -&nbsp;
1. -&nbsp;
1. -&nbsp;
1. Du siehst hier u.A. die von dir angegebene IP-Adresse des Notebooks.
1. Wenn du versuchst, eine IP-Adresse zu erreichen, die nicht im Netzwerk vorhanden ist, wird nach einiger Zeit ein Fehler angezeigt (*Timeout*).
1. Wenn du versuchst, eine IP-Adresse zu erreichen, die gar nicht zu deinem Netzwerk gehört, wird direkt die Fehlermeldung «Zieladresse nicht erreichbar» angezeigt.
1. -&nbsp;
:::

[^1]: Quelle: Adrian Sauer (2020), [Interaktiver Kurs zu Rechnernetzen](https://www.tutory.de/w/c4ae6cde), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
