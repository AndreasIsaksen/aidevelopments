import java.util.*;

public class SortTest2 {

    public static void main(String[] args) {

        int n, nDiv3, iterator, max;
        long tA, tL, t;

        Scanner S = new Scanner(System.in);

        while (true) {
            System.out.print("n? ");
            n = S.nextInt();
            System.out.print("max? ");
            max = S.nextInt();
            if (n>max){
                System.out.println("n must be smaller than max..");
                System.out.println("Try again.");
            } else {
                S.close();
                break;
            }

        }
        
        iterator = n;
        nDiv3 = n/3;

        System.out.println("n\t\ttA\ttL\ttL/tA");
        System.out.println("--------------------------------------------");

        //Looper gjennom alle sorteringer
        while (n <= max) {

            // Lager en Array med tilfeldige verdier
            int A[] = new int[n];
            int append, j = 0;
            Random r = new Random();
            for (int i=0; i<nDiv3; i++)
                A[i] = i;
            for (int i=nDiv3; i<nDiv3*2; i++)
                A[i] = r.nextInt(2*nDiv3);
            for (int i=nDiv3*2; i<nDiv3*3; i++) {
                append = nDiv3 + j;
                A[i] = append;
                j++;
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
