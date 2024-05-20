import EditProfile from "./EditProfile"; // Importation du composant EditProfile pour la modification du profil
import EditTransactions from "./EditTransactions"; // Importation du composant EditTransactions pour la modification des transactions
import { useGetCurrentUserQuery } from "@/store/services/authApiSlice"; // Importation de la requête pour obtenir l'utilisateur actuel

const Index = () => {
  // Récupération des données de l'utilisateur actuel
  const { data: user } = useGetCurrentUserQuery(null);

  return (
    <main className="main bg-dark py-10">
      <div className="header">
        <h1 className="mb-3 text-2xl font-semibold">
          Welcome back
          <br />
          {user?.body.firstName} {user?.body.lastName}! {/* Affichage du nom de l'utilisateur */}
        </h1>
        <EditProfile> {/* Composant EditProfile pour modifier le nom */}
          <button className="edit-button">Edit Name</button> {/* Bouton pour ouvrir la boîte de dialogue de modification du nom */}
        </EditProfile>
      </div>
      <h2 className="sr-only">Accounts</h2>

      <div className="space-y-4">
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <EditTransactions>
              <button className="transaction-button">View transactions</button>
            </EditTransactions>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <EditTransactions>
              <button className="transaction-button">View transactions</button>
            </EditTransactions>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <EditTransactions>
              <button className="transaction-button">View transactions</button>
            </EditTransactions>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Index;
