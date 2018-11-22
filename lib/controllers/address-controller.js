import ReyHelper from '../helpers/rey-helper';

const reyHelper = new ReyHelper();

async function addressView (req, res) {
  const manifest = await reyHelper.getAppManifest(req.params.address);
  const sessions = await reyHelper.getSessions(req.params.address);
  res.render('address', { address: req.params.address,
    manifest,
    sessions });
}

async function transactionView (req, res) {
  const transactions = await reyHelper.getTransactions(req.params.address);
  const transaction = transactions.find(tx => tx.request.readPermission.reader === req.params.readerAddress
                                          && tx.request.readPermission.source === req.params.sourceAddress
                                          && tx.request.counter === req.params.counter);
  const tx = { request: transaction.request,
    proof: transaction.proof,
    signature: transaction.signature };
  res.render('transaction', { address: req.params.address,
    transaction,
    tx,
    back: '/address/' + req.params.address });
}

export { addressView, transactionView };

