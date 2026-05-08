import java.util.*;

public class Oblig_2 {
    public static void lineær(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            tmp *= 1;
    }

    public static void kvadratisk(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            for (long j = 0; j < n; j++)
                tmp *= 1;
    }

    public static int logaritmisk(long n)
    {
        int tmp = 1, iterasjoner = 0;
        for (long i = n; i > 0; i /= 2, iterasjoner++)
            tmp *= 1;
        return iterasjoner;
    }

// Oppgave 1 a) (Del 1)
// Opprettet metode for superlineær iterasjon
    public static void superlineær(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            for (long j = n; j > 0; j /= 2)
                tmp *= 1;
    }

// Oppgave 2 a) (Del 1)
// Oppretter metode for kubisk iterasjon
    public static void kubisk(long n)
    {
        int tmp = 1;
        for (long i = 0; i < n; i++)
            for (long j = 0; j < n; j++)
                for (long k = 0; k < n; k++)
                    tmp *= 1;
    }

// Oppgave 3 a) (Del 1)
// Oppretter metode for eksponentiell iterasjon
    public static void eksponentiell(long n)
    {
        int tmp = 1;
        long iterasjoner = (long) Math.pow(2, n);
        for (long i = 0; i < iterasjoner; i++)
            tmp *= 1;
    }

// Oppgave 4 a) (Del 1)
// Oppretter metode for kombinatorisk iterasjon
    public static void kombinatorisk(long n)
    {
        int tmp = 1;
        long result = 1, counter = n;
        // Reger ut n!
        while (1 <= counter) {
            result *= counter;
            counter--;
        }
        // Itererer n! antall ganger
        for (long i = 0; i < result; i++) {
            tmp *= 1;
        }
    }

    public static void main(String[] args)
    {
        Scanner S = new Scanner(System.in);
        long n, T, T1, T2;
        int valg, iterasjoner = 0;

        System.out.print("1:O(n) 2:O(n²) 3:O(log_n) 4:O(n*log_n) 5:O(n³) 6:O(2^n) 7:O(n!) ? ");
        valg = S.nextInt();
        System.out.print("n? ");
        n = S.nextLong();

        T1 = System.currentTimeMillis();
        if (valg == 1)
            lineær(n);
        else if (valg == 2)
            kvadratisk(n);
        else if (valg == 3)
            iterasjoner = logaritmisk(n);
// Oppgave 1 a) (Del 2)
// Lagt til en if statement for valg av superlineær
        else if (valg == 4)
            superlineær(n);
// Oppgave 2 a) (Del 2)
// Lagt til en if statement for valg av kubisk
        else if (valg == 5) {
            kubisk(n);
        }
// Oppgave 3 a) (Del 2)
// Lagt til en if statement for valg av eksponentiell
        else if (valg == 6) {
            eksponentiell(n);
        }
// Oppgave 4 a) (Del 2)
// Lagt til en if statement for valg av kombinatorisk
        else if (valg == 7) {
            kombinatorisk(n);
        }
        T2 = System.currentTimeMillis();

        T = T2 - T1;
        System.out.print("T = " + T+ " ms");
        if (valg == 3)
            System.out.print(" (" + iterasjoner + ")");
        System.out.println();
    }
}
