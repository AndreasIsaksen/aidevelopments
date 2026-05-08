import java.util.Scanner;

public class Oppgave_5og6 {

    // Oppgave 5: Iterativ metode for å beregne binomialkoeffisienten C(n, m)
    public static long C_iterativ(int n, int m) {

        // Sjekker om n er mindre enn m
        if (n < m) {
            throw new IllegalArgumentException("n kan ikke være mindre enn m");
        }

        // Lager en array for å lagre raden i Pascals trekant
        long[] PaLine = new long[m + 1];
        PaLine[0] = 1;  // C(n, 0) = 1

        // Itererer gjennom Pascals trekant opp til rad n
        for (int i = 1; i <= n; i++) {
            // Går baklengs gjennom arrayet for å oppdatere verdier basert på rekursjonsformelen
            for (int j = Math.min(i, m); j > 0; j--) {
                PaLine[j] = PaLine[j] + PaLine[j - 1];
            }
        }
        // Returnerer binomialkoeffisienten til C(n, m)
        return PaLine[m];
    }

    // Oppgave 6: Metode for å generere én rad av Pascals trekant
    public static long[] PascalLine(int n) {
        long[] out = new long[n + 1]; // Array for å lagre verdiene i Pascals trekant for rad n

        // Fyller ut rad n ved å beregne hver verdi med C_iterativ()
        for (int i = 0; i <= n; i++) {
            out[i] = C_iterativ(n, i);
        }
        return out;
    }

    public static void main(String[] args) {
        
        Scanner S = new Scanner(System.in);
        int n, m, counter = 0; // Variabler for input og teller for utskrift
        long result, T1, T2, T;
        long[] PaList; // Array for å lagre Pascals trekant-raden

        
        System.out.print("n? ");
        n = S.nextInt();
        System.out.print("m? ");
        m = S.nextInt();
        S.close();

        System.out.println();

        // Måler tid for å beregne C(n, m) iterativt
        T1 = System.currentTimeMillis();
        result = C_iterativ(n, m);
        T2 = System.currentTimeMillis();
        T = T2 - T1;

        // Skriver ut resultatet av C(n, m)
        System.out.println("'" + n + " velg " + m + "' gir " + result);
        System.out.println(T + "ms");

        System.out.println();

        // Måler tid for generering av Pascals trekant-raden
        T1 = System.currentTimeMillis();
        PaList = PascalLine(n);
        T2 = System.currentTimeMillis();
        T = T2 - T1;

        // Skriver ut hele Pascals trekant-raden for gitt n
        while (PaList.length > counter) {
            System.out.println("(" + n + " velg " + counter + ") = " + PaList[counter]);
            counter++;
        }
        System.out.println(T + "ms");
    }
}
