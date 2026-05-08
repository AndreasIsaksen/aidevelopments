import java.util.*;

public class SortTest1 {

    public static void main(String[] args) {

        int n, iterator, max = 10000000;
        long tA, tL, t;

        Scanner S = new Scanner(System.in);

        System.out.print("n? ");
        n = S.nextInt();
        S.close();
        iterator = n;

        System.out.println("n\t\ttA\ttL\ttL/tA");
        System.out.println("--------------------------------------------");

        //Looper gjennom alle sorteringer
        while (n <= max) {

            // Lager en Array med tilfeldige verdier
            int A[] = new int[n];
            Random r = new Random();
            for (int i=0; i<n; i++) {
                A[i] = r.nextInt(2*n);
            }

            // Lager en kopi av A ved å legge til elementer på slutten av L
            LinkedList<Integer> L = new LinkedList<Integer>();
            for (int i = 0; i < n; i++) {
                L.addLast(Integer.valueOf(A[i]));
            }

            //Sorterer Array liste
            t = System.currentTimeMillis();
            Arrays.sort(A);
            tA = System.currentTimeMillis() - t;
            
            //Sorterer LinkedList
            t = System.currentTimeMillis();
            Collections.sort(L);
            tL = System.currentTimeMillis() - t;

            //if statement håndterer tabbing for utskrift.
            if (n < max) {
                System.out.printf("%d\t\t%-5d\t%-5d\t%-5.1f\n",
                                n, tA, tL, (float) tL / (float) tA);
            } else {
                System.out.printf("%d\t%-5d\t%-5d\t%-5.1f\n",
                                n, tA, tL, (float) tL / (float) tA);
            }
            n += iterator;
        }

        System.out.println("--------------------------------------------");

    }
}
